import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'

import NewsletterForm from '@/components/NewsletterForm'
import Card from '@/components/Card'

import projectsData from '@/data/projectsData'
import ListLayout from '@/layouts/ListLayout'

const MAX_DISPLAY = 2

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  let LatestProject
  if (projectsData.length != 0) {
    LatestProject = projectsData[0]
  }
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Welcome!
            </h1>
          </div>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Check out the Latest Unreal Project
          </p>
          {LatestProject && (
            <Card
              title={LatestProject.title}
              description={LatestProject.description}
              imgSrc={LatestProject.imgSrc}
              href={LatestProject.href}
              size="Large"
            />
          )}
          <div className="space-y-2 pb-8 pt-0"></div>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        {/* <div className="divide-y divide-gray-200 dark:divide-gray-700"> */}
        {!posts.length && 'No posts found.'}
        <ListLayout
          posts={posts.slice(0, MAX_DISPLAY)}
          initialDisplayPosts={posts.slice(0, MAX_DISPLAY)}
          homepage
          pagination={''}
          // title="All Posts"
        />
        {/* {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
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
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })} */}
      </div>
      {/* </div> */}
      {/* {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )} */}
      {siteMetadata.newsletter.provider !== '' && (
    <div className="flex items-center justify-center pt-4">
        <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">

            <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
                <Link href={"https://buttondown.email/johnny-mcoy"} target="_blank" rel="noopener noreferrer"
                    className={`w-full rounded-md bg-primary-500 px-4 py-2 font-medium text-white sm:py-0 hover:bg-primary-700 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}>
                    Sign up to my Newsletter
                </Link>
            </div>
          </div>
        {/* <NewsletterForm /> */}
        </div>
        )}
    </>
  )
}
