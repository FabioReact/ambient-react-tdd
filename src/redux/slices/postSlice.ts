import { Post } from '@/types/post'
import { createSlice } from '@reduxjs/toolkit'

const initialState: Post[] = [
	{
		id: 300,
		title: 'Titre en dur',
		author: 'Fabio',
	}
]

export const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		getPosts: (state) => {
			return state
		}
	},
})

export const { getPosts } = postSlice.actions

export default postSlice.reducer