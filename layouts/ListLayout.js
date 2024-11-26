import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata, { description } from '@/data/siteMetadata'
import { useState } from 'react'
import Image from '@/components/Image'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Card from '@/components/Card'

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  homepage,
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts
  return (
    <>
      {/* //todo Add in homepage version  */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className={homepage ? '' : 'space-y-2 pb-8 pt-6 md:space-y-5 '}>
          {title && (
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {title}
            </h1>
          )}
          {!homepage && (
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
          )}
        </div>
        <ul>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap justify-center">
              {!filteredBlogPosts.length && 'No posts found.'}
              {displayPosts.map((frontMatter) => {
                const { slug, date, title, summary, tags, images } = frontMatter
                return (
                  <Card
                    key={slug}
                    className="w-full"
                    title={title}
                    description={summary}
                    date={formatDate(date)}
                    imgSrc={
                      images != null ? images[0] : '/static/images/plugins/MenuSystemThumbnail.webp'
                    }
                    href={`/blog/${slug}`}
                  />
                )
              })}
            </div>
          </div>
          {/* Todo  List version as well as card layout    */}
          {/* {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            return (
                <li key={slug} className="py-4">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={`/${slug}`} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            )
        })} */}

          {/* {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            return (
                <li key={slug} className="py-4 ">
                <Link href={`/blog/${slug}`} className="a">
                    <article className="space-x-10 ">
                    <div className="space-y-3 x1:col-span-3">
                        <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                            {title}
                        </h3>
                        <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date)}</time>
                            </dd>
                        </dl>
                        <div className="flex flex-wrap">
                            {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                                ))}
                        </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                        </div>
                    </div>
                    </article>
                </Link>
               </li>
            )
          })} */}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
