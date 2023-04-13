import { render, screen } from '@testing-library/react'
import Home from '@/pages/Home'

describe('Home Page', () => {
	it('should have a title with Vite + React', () => {
		render(<Home />)
		const title = screen.getAllByRole('heading')
		expect(title[0]).toHaveTextContent(/^Home$/)
	})
})