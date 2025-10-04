export default function Home() {
	return (
		<div className='min-h-screen bg-zus-light-gray flex items-center justify-center p-4'>
			<div className='bg-zus-white border-2 border-zus-green rounded-lg shadow-xl p-8 w-full max-w-4xl text-center'>
				<h1 className='text-4xl font-bold text-zus-black mb-4'>siema</h1>
				<p className='text-zus-dark-green mb-6'>Witaj w kalkulatorze emerytalnym ZUS</p>
				<a
					href='/form'
					className='inline-block px-6 py-3 bg-zus-green hover:bg-zus-dark-green text-white font-medium rounded-lg transition-colors'>
					Przejdź do formularza →
				</a>
			</div>
		</div>
	)
}
