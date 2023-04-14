import { useAppSelector } from '@/redux/hooks'
import { getPosts } from '@/redux/slices/postSlice'

const Posts = () => {
	const posts = useAppSelector(state => state.posts)
	return (
		<section>
			<h1>Posts</h1>
			<ul>
				{posts.map(post => <li key={post.id}>{post.title}</li> )}
			</ul>
		</section>
	)
}

export default Posts