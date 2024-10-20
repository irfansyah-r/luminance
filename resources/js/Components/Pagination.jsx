import { Link } from '@inertiajs/react'
import queryString from 'query-string'
const Pagination = ({ paginateItems, className, filters }) => {

	if (paginateItems.last_page == 1) return

	return (
		<nav className={className} >
			<ul className="flex flex-row items-center gap-1">
				{/*  Previous Page Link  */}
				<li>
					{paginateItems.prev_page_url
						? (
							<Link className="pagination-page " href={route(route().current()) + '?' + queryString.stringify({...filters, page: paginateItems.current_page - 1})}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-5 w-5">
									<path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
								</svg>
								Prev
							</Link >
						)
						: (
							<span className="pagination-page ">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-5 w-5">
									<path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
								</svg>
								Prev
							</span>
						)
					}
				</li>

				{/*  Pagination Elements  */}
				{paginateItems.links.slice(1, -1).map((link) => (

					(link.url && link.active)
						? (
							<li key={link.label} aria-disabled="true">
								<span className="pagination-current-page">
									{link.label}
								</span>
							</li>
						) : (
							<li key={link.label} className="hidden sm:block" aria-disabled="true">
								<Link className="pagination-page" href={route(route().current()) + '?' + queryString.stringify({...filters, page: link.label})}>
									{link.label}
								</Link >
							</li>
						)
				))}

				{/*  Next Page Link  */}
				<li>
					{paginateItems.next_page_url
						? (
							<Link className="pagination-page " href={route(route().current()) + '?' + queryString.stringify({...filters, page: paginateItems.current_page + 1})}>
								Next
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-5 w-5" >
									<path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
								</svg>
							</Link >
						)
						: (
							<span className="pagination-page ">
								Next
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-5 w-5" >
									<path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
								</svg>
							</span>
						)
					}
				</li>
			</ul>
		</nav>
	)
}
export default Pagination

