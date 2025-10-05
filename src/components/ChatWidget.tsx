'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
	role: 'user' | 'assistant'
	content: string
}

interface ChatWidgetProps {
	formContext?: Record<string, any>
	onFormUpdate?: (updates: Record<string, any>) => void
}

export function ChatWidget({ formContext, onFormUpdate }: ChatWidgetProps) {
	// Wykryj czy to dashboard
	const isDashboard = formContext?.scenario || formContext?.yearDataLength

	const [isOpen, setIsOpen] = useState(false)
	const [hasShownInitially, setHasShownInitially] = useState(false)
	const [showPulse, setShowPulse] = useState(true)
	const [messages, setMessages] = useState<Message[]>([
		{
			role: 'assistant',
			content: isDashboard
				? `Cześć! 👋 Jestem asystentem AI dashboardu emerytalnego.

**Mogę Ci pomóc:**
• Wyjaśnić dane z wykresu i tabeli
• Interpretować scenariusze ekonomiczne
• Tłumaczyć kapitał nominalny vs realny
• Doradzać w planowaniu emerytalnym

**Przykłady:**
• "Co oznacza ten wykres?"
• "Dlaczego kapitał realny jest niższy?"
• "Jak wpływa scenariusz na emeryturę?"

Napisz co Cię interesuje! 💬`
				: `Cześć! 👋 Jestem asystentem AI kalkulatora emerytalnego.

**Mogę:**
• Wyjaśniać wyniki i pojęcia emerytalne
• Zmieniać parametry formularza na Twoje polecenie
• Przeprowadzać symulacje "co jeśli"

**Przykłady:**
• "Ustaw wiek na 35 lat"
• "Zrób symulację z pensją 12000 zł"
• "Co to jest stopa zastąpienia?"

Napisz co Cię interesuje! 💬`,
		},
	])
	const [input, setInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus()
		}
	}, [isOpen])

	// Auto-otwieranie chatu - tylko desktop, z opóźnieniem, tylko raz
	useEffect(() => {
		// Sprawdź czy użytkownik wcześniej zamknął chat
		const userClosed = localStorage.getItem('chatUserClosed')
		if (userClosed === 'true') {
			setHasShownInitially(true)
			return
		}

		// Wykryj czy desktop (ekran >= 1024px)
		const isDesktop = window.matchMedia('(min-width: 1024px)').matches

		if (isDesktop && !hasShownInitially) {
			// Na desktopie - otwórz po 10 sekundach
			const timer = setTimeout(() => {
				setIsOpen(true)
				setHasShownInitially(true)
			}, 10000)

			return () => clearTimeout(timer)
		} else {
			// Na mobile - nigdy nie otwieraj automatycznie
			setHasShownInitially(true)
		}
	}, [hasShownInitially])

	// Wyłącz pulsowanie po 5 sekundach
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowPulse(false)
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	const handleSend = async () => {
		if (!input.trim() || isLoading) return

		const userMessage: Message = { role: 'user', content: input.trim() }
		setMessages(prev => [...prev, userMessage])
		setInput('')
		setIsLoading(true)

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: [...messages, userMessage],
					formContext,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to get response')
			}

			const data = await response.json()

			// Sprawdź czy są tool calls do wykonania
			if (data.requires_tool_execution && data.tool_results) {
				// Wykonaj aktualizacje formularza
				for (const toolResult of data.tool_results) {
					const result = toolResult.result

					if (result.success && onFormUpdate) {
						// Pojedyncze pole
						if (result.field && result.value !== undefined) {
							onFormUpdate({ [result.field]: result.value })
						}
						// Wiele pól
						else if (result.updates) {
							onFormUpdate(result.updates)
						}
						// Symulacja scenariusza
						else if (result.changes) {
							onFormUpdate(result.changes)
						}
					}
				}

				// Dodaj wiadomość potwierdzającą
				const confirmationMessage = data.tool_results.map((tr: any) => tr.result.message).join('\n')

				setMessages(prev => [
					...prev,
					{
						role: 'assistant',
						content: `✅ ${confirmationMessage}\n\nFormularz został zaktualizowany. Wyniki przeliczą się automatycznie.`,
					},
				])
			} else {
				// Zwykła odpowiedź tekstowa
				const assistantMessage: Message = {
					role: 'assistant',
					content: data.message,
				}
				setMessages(prev => [...prev, assistantMessage])
			}
		} catch (error) {
			console.error('Chat error:', error)
			setMessages(prev => [
				...prev,
				{
					role: 'assistant',
					content: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.',
				},
			])
		} finally {
			setIsLoading(false)
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	const handleOpen = () => {
		setIsOpen(true)
		setShowPulse(false)
	}

	const handleClose = () => {
		setIsOpen(false)
		// Zapamiętaj że użytkownik zamknął - nie otwieraj więcej automatycznie
		localStorage.setItem('chatUserClosed', 'true')
	}

	return (
		<>
			{/* Floating Button */}
			{!isOpen && (
				<button
					onClick={handleOpen}
					className={`fixed bottom-6 right-6 z-50 bg-[var(--zus-green-primary)] hover:bg-blue-dark text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/30 ${
						showPulse ? 'animate-pulse' : ''
					}`}
					aria-label='Otwórz chat z asystentem'>
					<MessageCircle className='w-6 h-6' />
				</button>
			)}

			{/* Chat Window */}
			{isOpen && (
				<div className='fixed bottom-0 right-0 lg:bottom-6 lg:right-6 z-50 w-full h-full lg:w-[380px] lg:h-[600px] bg-white lg:rounded-lg shadow-2xl flex flex-col border-t lg:border border-gray-200'>
					{/* Header */}
					<div className='bg-[var(--zus-green-primary)] text-white p-4 lg:rounded-t-lg flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<MessageCircle className='w-5 h-5' />
							<div>
								<h3 className='font-semibold text-sm'>Doradca Emerytalny AI</h3>
								<p className='text-xs opacity-90'>Kalkulator Emerytalny</p>
							</div>
						</div>
						<button
							onClick={handleClose}
							className='hover:bg-white/20 rounded p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50'
							aria-label='Zamknij chat'>
							<X className='w-5 h-5' />
						</button>
					</div>

					{/* Messages */}
					<div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
						{messages.map((message, index) => (
							<div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
								<div
									className={`max-w-[80%] rounded-lg p-3 ${
										message.role === 'user'
											? 'bg-[var(--zus-green-primary)] text-white'
											: 'bg-white border border-gray-200 text-foreground'
									}`}>
									<div
										className='text-sm whitespace-pre-wrap prose prose-sm max-w-none prose-strong:font-semibold prose-ul:my-1 prose-li:my-0'
										dangerouslySetInnerHTML={{
											__html: message.content
												.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
												.replace(/^• /gm, '• ')
												.replace(/\n/g, '<br/>'),
										}}
									/>
								</div>
							</div>
						))}
						{isLoading && (
							<div className='flex justify-start'>
								<div className='bg-white border border-gray-200 rounded-lg p-3'>
									<Loader2 className='w-4 h-4 animate-spin text-primary' />
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div className='p-4 border-t border-gray-200 bg-white lg:rounded-b-lg'>
						<div className='flex gap-2'>
							<input
								ref={inputRef}
								type='text'
								value={input}
								onChange={e => setInput(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder='Zadaj pytanie...'
								disabled={isLoading}
								className='flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed'
							/>
							<Button
								onClick={handleSend}
								disabled={!input.trim() || isLoading}
								size='sm'
								className='bg-[var(--zus-green-primary)] hover:bg-blue-dark text-white px-3'>
								<Send className='w-4 h-4' />
							</Button>
						</div>
						<p className='text-xs text-muted-foreground mt-2'>Naciśnij Enter aby wysłać</p>
					</div>
				</div>
			)}
		</>
	)
}
