import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata, { description } from '@/data/siteMetadata'
import { useState } from 'react'
import Image from '@/components/Image'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Card from '@/components/Card'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts
  console.log(displayPosts[0]);
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5 ">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {/* <ul> */}
        <div className="container py-12">
        <div className="-m-4 flex flex-wrap">

          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            if(images != null){console.log(images[0])}
            return (
                <Card key={slug}
                    className="w-full"
                    title={title}
                    description={summary}
                    // description={`${description}, ${formatDate(date)}`}
                    date={formatDate(date)}
                    imgSrc={images != null ? images[0] : "/static/images/plugins/MenuSystemThumbnail.webp"}
                    href={`/blog/${slug}`}
                    />
                // <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                // All Game Related Projects
                    /* <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                        </dd>
                    </dl> */
                // </p>


            //     <li key={slug} className="py-4 ">

            //     <Link href={`/blog/${slug}`} className="a">
            //         <article className="space-x-10 ">
            //         <div className="space-y-3 x1:col-span-3">
            //             {/* <Card imgSrc={"/static/images/plugins/ChatSystemThumbnail.webp"} title={title} description={summary}> */}
            //                 {/* <Image src={"/static/images/plugins/ChatSystemThumbnail.webp"} width={140} height={70} /> */}
            //             {/* </Card> */}
            //             {/* </div> */}
            //             <div>
            //             <h3 className="text-2xl font-bold leading-8 tracking-tight">
            //                 {/* <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100"> */}
            //                 {title}
            //                 {/* </Link> */}
            //             </h3>
            //             <dl>
            //                 <dt className="sr-only">Published on</dt>
            //                 <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            //                 <time dateTime={date}>{formatDate(date)}</time>
            //                 </dd>
            //             </dl>
            //             <div className="flex flex-wrap">
            //                 {tags.map((tag) => (
            //                     <Tag key={tag} text={tag} />
            //                     ))}
            //             </div>
            //             </div>
            //             <div className="prose max-w-none text-gray-500 dark:text-gray-400">
            //             {summary}
            //             </div>
            //         </div>
            //         </article>
            //     </Link>
            //    </li>
            )
          })}
          </div>
          </div>
        {/* </ul> */}
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
