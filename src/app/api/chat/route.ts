import { NextRequest, NextResponse } from 'next/server'

interface Message {
	role: 'user' | 'assistant' | 'system' | 'tool'
	content: string | null
	tool_calls?: any[]
	tool_call_id?: string
	name?: string
}

interface ChatRequest {
	messages: Message[]
	formContext?: Record<string, any>
}

interface ToolCall {
	id: string
	type: 'function'
	function: {
		name: string
		arguments: string
	}
}

function buildDashboardSystemPrompt(formContext?: Record<string, any>): string {
	const basePrompt = `<system_role>
Jesteś inteligentnym asystentem AI dla Dashboardu Emerytalnego ZUS.
Pomagasz użytkownikom w zrozumieniu szczegółowej analizy rok po roku i interpretacji wyników.
</system_role>

<capabilities>
<knowledge>
- Interpretacja wykresów wzrostu kapitału emerytalnego
- Analiza danych rok po roku (tabela szczegółowa)
- Scenariusze makroekonomiczne (pesymistyczny, umiarkowany, optymistyczny)
- Wpływ parametrów: wzrost wynagrodzeń, inflacja, bezrobocie
- Zwolnienia lekarskie i ich wpływ na kapitał
- Kapitał nominalny vs realny (dzisiejsza siła nabywcza)
- Stopa zastąpienia i jej znaczenie dla poziomu życia
- Planowanie emerytalne długoterminowe
</knowledge>

<mode>
TRYB DASHBOARDU - Tylko wyjaśnianie i doradztwo, BEZ modyfikacji danych.
Użytkownik może zmieniać parametry bezpośrednio w interfejsie dashboardu.
Twoim zadaniem jest tłumaczenie danych, nie ich zmiana.
</mode>
</capabilities>

<instructions>
1. Odpowiadaj zwięźle, konkretnie i po polsku
2. Wyjaśniaj dane z wykresu i tabeli rok po roku
3. Interpretuj wpływ wybranego scenariusza ekonomicznego
4. Tłumacz różnice między wartościami nominalnymi a realnymi
5. Doradzaj w kontekście długoterminowego planowania
6. Odwołuj się do konkretnych liczb z dashboardu użytkownika
7. Sugeruj na co zwrócić uwagę w szczegółowej analizie
8. Wyjaśniaj trendy widoczne na wykresie wzrostu kapitału
</instructions>`

	if (!formContext) {
		return basePrompt
	}

	const contextInfo = `

<dashboard_context>
<user_parameters>
${formContext.age ? `- Wiek: ${formContext.age} lat` : ''}
${formContext.gender ? `- Płeć: ${formContext.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}` : ''}
${formContext.grossSalary ? `- Aktualne wynagrodzenie: ${formContext.grossSalary.toLocaleString('pl-PL')} zł/mc` : ''}
${formContext.workStartYear ? `- Rok rozpoczęcia pracy: ${formContext.workStartYear}` : ''}
${formContext.plannedRetirementYear ? `- Planowany rok emerytury: ${formContext.plannedRetirementYear}` : ''}
${formContext.yearsToRetirement ? `- Lat do emerytury: ${formContext.yearsToRetirement}` : ''}
</user_parameters>

<final_results>
${formContext.monthlyPension ? `- Emerytura nominalna: ${Math.round(formContext.monthlyPension).toLocaleString('pl-PL')} zł/mc` : ''}
${formContext.realMonthlyPension ? `- Emerytura realna (dzisiejsze zł): ${Math.round(formContext.realMonthlyPension).toLocaleString('pl-PL')} zł/mc` : ''}
${formContext.totalCapital ? `- Kapitał nominalny: ${Math.round(formContext.totalCapital).toLocaleString('pl-PL')} zł` : ''}
${formContext.realTotalCapital ? `- Kapitał realny: ${Math.round(formContext.realTotalCapital).toLocaleString('pl-PL')} zł` : ''}
${formContext.replacementRate ? `- Stopa zastąpienia: ${formContext.replacementRate}%` : ''}
</final_results>

<scenario_settings>
${formContext.scenario ? `- Scenariusz: ${formContext.scenario}` : ''}
${formContext.scenarioDescription ? `- Opis: ${formContext.scenarioDescription}` : ''}
${formContext.wageGrowth ? `- Wzrost wynagrodzeń: ${formContext.wageGrowth}% rocznie` : ''}
${formContext.inflation ? `- Inflacja: ${formContext.inflation}% rocznie` : ''}
${formContext.unemployment ? `- Bezrobocie: ${formContext.unemployment}%` : ''}
</scenario_settings>

<additional_data>
${formContext.sickLeavesCount !== undefined ? `- Zwolnienia lekarskie: ${formContext.sickLeavesCount} wpisów` : ''}
${formContext.yearDataLength ? `- Analiza obejmuje: ${formContext.yearDataLength} lat` : ''}
</additional_data>

<usage_instructions>
Używaj tych danych do udzielania spersonalizowanych wyjaśnień.
Odwołuj się do konkretnych liczb użytkownika.
Wyjaśniaj co oznaczają trendy i wartości na dashboardzie.
Doradzaj jak interpretować wyniki w kontekście planowania emerytalnego.
</usage_instructions>
</dashboard_context>`

	return basePrompt + contextInfo
}

function buildSystemPrompt(formContext?: Record<string, any>): string {
	const basePrompt = `<system_role>
Jesteś inteligentnym asystentem AI dla Kalkulatora Emerytalnego ZUS.
Pomagasz użytkownikom w zrozumieniu systemu emerytalnego i przeprowadzaniu symulacji.
</system_role>

<capabilities>
<knowledge>
- System emerytalny w Polsce (ZUS, FUS20)
- Kalkulacje emerytur i kapitału emerytalnego
- Interpretacja wyników kalkulatora
- Pojęcia: stopa zastąpienia, waloryzacja, zwolnienia lekarskie
- Planowanie emerytalne i strategie optymalizacji
</knowledge>

<tools>
Masz dostęp do 3 funkcji, które pozwalają Ci BEZPOŚREDNIO modyfikować formularz użytkownika:

<tool name="update_form_field">
Aktualizuje pojedyncze pole formularza.
Użyj gdy użytkownik chce zmienić jeden parametr.
Przykład: "Ustaw wiek na 35 lat" → update_form_field(field: "age", value: 35)
</tool>

<tool name="update_multiple_fields">
Aktualizuje wiele pól formularza jednocześnie.
Użyj gdy użytkownik chce zmienić kilka parametrów naraz lub przeprowadzić kompleksową symulację.
Przykład: "Zmień wiek na 40 i pensję na 10000" → update_multiple_fields(updates: {age: 40, grossSalary: 10000})
</tool>

<tool name="simulate_scenario">
Przeprowadza symulację scenariusza "co jeśli".
Użyj do analiz porównawczych i eksploracji różnych opcji.
Przykład: "Co będzie jak odłożę emeryturę o 5 lat" → simulate_scenario(scenario_name: "odroczenie o 5 lat", changes: {plannedRetirementYear: +5})
</tool>

Dostępne pola do modyfikacji:
- age (wiek, 18-64)
- gender (płeć: "male" lub "female")
- grossSalary (pensja brutto w PLN)
- workStartYear (rok rozpoczęcia pracy)
- plannedRetirementYear (planowany rok emerytury)
- zusAccountBalance (środki na koncie ZUS)
- zusSubaccountBalance (środki na subkoncie ZUS)
- includeSickLeave (uwzględnienie zwolnień: true/false)
</tools>
</capabilities>

<instructions>
1. Odpowiadaj zwięźle, konkretnie i po polsku
2. Używaj prostego języka, unikaj zbędnego żargonu
3. Gdy użytkownik prosi o zmianę/symulację - UŻYJ odpowiedniego tool
4. Po wykonaniu tool, wyjaśnij co się zmieniło i jaki to ma wpływ
5. Odwołuj się do konkretnych liczb użytkownika z kontekstu
6. Jeśli nie znasz odpowiedzi, przyznaj się uczciwie
7. Proaktywnie sugeruj ciekawe symulacje i scenariusze
</instructions>`

	if (!formContext) {
		return basePrompt
	}

	// Przygotuj kontekst formularza
	const contextInfo = `

<user_context>
<current_data>
${formContext.gender ? `- Płeć: ${formContext.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}` : ''}
${formContext.age ? `- Wiek: ${formContext.age} lat` : ''}
${formContext.grossSalary ? `- Wynagrodzenie brutto: ${formContext.grossSalary.toLocaleString('pl-PL')} zł/mc` : ''}
${formContext.workStartYear ? `- Rok rozpoczęcia pracy: ${formContext.workStartYear}` : ''}
${formContext.plannedRetirementYear ? `- Planowany rok emerytury: ${formContext.plannedRetirementYear}` : ''}
${formContext.includeSickLeave ? `- Zwolnienia lekarskie: uwzględnione` : '- Zwolnienia lekarskie: nie uwzględnione'}
</current_data>

<calculated_results>
${formContext.monthlyPension ? `- Prognozowana emerytura (nominalna): ${Math.round(formContext.monthlyPension).toLocaleString('pl-PL')} zł/mc` : ''}
${formContext.realMonthlyPension ? `- W dzisiejszej sile nabywczej: ${Math.round(formContext.realMonthlyPension).toLocaleString('pl-PL')} zł/mc` : ''}
${formContext.replacementRate ? `- Stopa zastąpienia: ${formContext.replacementRate}%` : ''}
${formContext.totalCapital ? `- Zgromadzony kapitał: ${Math.round(formContext.totalCapital).toLocaleString('pl-PL')} zł` : ''}
${formContext.includeSickLeave && formContext.sickLeaveDaysPerYear ? `- Wpływ zwolnień: -${formContext.sickLeaveImpactPercentage}% (${formContext.sickLeaveDaysPerYear} dni/rok)` : ''}
</calculated_results>

<usage_instructions>
Używaj tych danych do udzielania spersonalizowanych odpowiedzi.
Odwołuj się do konkretnych liczb użytkownika.
Gdy sugerujesz symulacje, bazuj na aktualnych wartościach.
</usage_instructions>
</user_context>`

	return basePrompt + contextInfo
}

// Definicja dostępnych tools/functions
const tools = [
	{
		type: 'function',
		function: {
			name: 'update_form_field',
			description:
				'Aktualizuje pojedyncze pole formularza kalkulatora emerytalnego. Użyj tej funkcji gdy użytkownik chce zmienić swoje dane lub przeprowadzić symulację z innymi wartościami.',
			parameters: {
				type: 'object',
				properties: {
					field: {
						type: 'string',
						enum: [
							'age',
							'gender',
							'grossSalary',
							'workStartYear',
							'plannedRetirementYear',
							'zusAccountBalance',
							'zusSubaccountBalance',
							'includeSickLeave',
						],
						description: 'Nazwa pola do aktualizacji',
					},
					value: {
						description: 'Nowa wartość dla pola',
					},
				},
				required: ['field', 'value'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'update_multiple_fields',
			description:
				'Aktualizuje wiele pól formularza jednocześnie. Użyj gdy użytkownik chce przeprowadzić kompleksową symulację lub zmienić kilka parametrów naraz.',
			parameters: {
				type: 'object',
				properties: {
					updates: {
						type: 'object',
						description: 'Obiekt z polami do aktualizacji i ich nowymi wartościami',
						properties: {
							age: { type: 'number', description: 'Wiek użytkownika (18-64)' },
							gender: {
								type: 'string',
								enum: ['male', 'female'],
								description: 'Płeć użytkownika',
							},
							grossSalary: {
								type: 'number',
								description: 'Wynagrodzenie brutto miesięczne w PLN',
							},
							workStartYear: {
								type: 'number',
								description: 'Rok rozpoczęcia pracy',
							},
							plannedRetirementYear: {
								type: 'number',
								description: 'Planowany rok przejścia na emeryturę',
							},
							zusAccountBalance: {
								type: 'number',
								description: 'Środki na koncie ZUS',
							},
							zusSubaccountBalance: {
								type: 'number',
								description: 'Środki na subkoncie ZUS',
							},
							includeSickLeave: {
								type: 'boolean',
								description: 'Czy uwzględnić zwolnienia lekarskie',
							},
						},
					},
				},
				required: ['updates'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'simulate_scenario',
			description:
				'Przeprowadza symulację "co jeśli" zmieniając wybrane parametry. Idealny do porównań i analiz scenariuszy.',
			parameters: {
				type: 'object',
				properties: {
					scenario_name: {
						type: 'string',
						description: 'Nazwa scenariusza (np. "wyższa pensja", "odroczenie emerytury")',
					},
					changes: {
						type: 'object',
						description: 'Zmiany do zastosowania w symulacji',
					},
				},
				required: ['scenario_name', 'changes'],
			},
		},
	},
]

// Wykonanie tool call
function executeToolCall(toolName: string, args: any): any {
	switch (toolName) {
		case 'update_form_field':
			return {
				success: true,
				field: args.field,
				value: args.value,
				message: `Zaktualizowano pole ${args.field} na wartość ${args.value}`,
			}

		case 'update_multiple_fields':
			return {
				success: true,
				updates: args.updates,
				message: `Zaktualizowano ${Object.keys(args.updates).length} pól formularza`,
			}

		case 'simulate_scenario':
			return {
				success: true,
				scenario: args.scenario_name,
				changes: args.changes,
				message: `Przeprowadzono symulację: ${args.scenario_name}`,
			}

		default:
			return {
				success: false,
				error: 'Nieznana funkcja',
			}
	}
}

export async function POST(request: NextRequest) {
	try {
		const { messages, formContext }: ChatRequest = await request.json()

		if (!messages || !Array.isArray(messages)) {
			return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
		}

		const apiKey = process.env.OPENAI_API_KEY

		if (!apiKey) {
			console.error('OPENAI_API_KEY not configured')
			return NextResponse.json(
				{
					message:
						'Przepraszam, asystent AI nie jest obecnie skonfigurowany. Skontaktuj się z administratorem.',
				},
				{ status: 200 }
			)
		}

		// Wykryj czy to dashboard (ma dodatkowe dane)
		const isDashboard = formContext?.scenario || formContext?.yearDataLength
		
		// Przygotuj wiadomości z odpowiednim system promptem
		const systemPrompt = isDashboard 
			? buildDashboardSystemPrompt(formContext)
			: buildSystemPrompt(formContext)
		const apiMessages = [{ role: 'system', content: systemPrompt }, ...messages]

		// Wywołanie OpenAI API (z tools tylko dla formularza, bez tools dla dashboardu)
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				messages: apiMessages,
				...(isDashboard ? {} : { tools: tools, tool_choice: 'auto' }), // Tools tylko dla formularza
				temperature: 0.7,
				max_tokens: 500,
			}),
		})

		if (!response.ok) {
			const error = await response.json()
			console.error('OpenAI API error:', error)
			throw new Error('OpenAI API request failed')
		}

		const data = await response.json()
		const choice = data.choices[0]
		const assistantMessage = choice?.message

		if (!assistantMessage) {
			throw new Error('No response from OpenAI')
		}

		// Sprawdź czy model chce wywołać funkcję
		if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
			const toolCalls = assistantMessage.tool_calls
			const toolResults: any[] = []

			// Wykonaj wszystkie tool calls
			for (const toolCall of toolCalls) {
				const functionName = toolCall.function.name
				const functionArgs = JSON.parse(toolCall.function.arguments)

				console.log(`Executing tool: ${functionName}`, functionArgs)

				const result = executeToolCall(functionName, functionArgs)
				toolResults.push({
					tool_call_id: toolCall.id,
					result: result,
				})
			}

			// Zwróć odpowiedź z tool calls do frontendu
			return NextResponse.json({
				message: null,
				tool_calls: toolCalls,
				tool_results: toolResults,
				requires_tool_execution: true,
			})
		}

		// Zwykła odpowiedź tekstowa
		return NextResponse.json({
			message: assistantMessage.content,
			requires_tool_execution: false,
		})
	} catch (error) {
		console.error('Chat API error:', error)
		return NextResponse.json(
			{
				message: 'Przepraszam, wystąpił błąd podczas przetwarzania Twojego pytania. Spróbuj ponownie.',
			},
			{ status: 200 }
		)
	}
}
