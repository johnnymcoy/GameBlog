import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'

export async function getStaticProps() {
  const tags = await getAllTags('blog')
  return { props: { tags } }
}

export default function Playtest({ tags }) {
  return (
    <>
      <PageSEO title={`Playtest - ${siteMetadata.author}`} description={siteMetadata.description} />
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-8 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-2 pb-8 md:space-y-5">
            <div>
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Playtest!
                </h1>
            </div>
        </div>
    </div>
    <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
        <div className="prose max-w-600 pt-2 pb-8 dark:prose-dark">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400  ">
                Currently gathering players for a Steam playtest.
                Fill out the form and a Steam Key will be sent to your email with instructions.
            </p>
              </div>
    </div>
    <button>Sign up</button>
    <form>
        <label id="Name_Label">Name</label>
        <input lablel="Name_Label" />
        <label id="Email_Label">Email</label>
        <input lablel="Email_Label" />
        <label id="Steam_Label">Steam Name</label>
        <input lablel="Steam_Label" />
        <div>
            Optional 
            <label id="Graphics_Label">Graphics Card</label>
            <input lablel="Graphics_Label" />
        </div>
        <button>Submit Request</button>
    </form>
    <button>Submit Feedback</button>
    <Link
        href={`/tags/${kebabCase("/")}`}
        className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
    >
        Link
    </Link>

        {/* <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div> */}
    </>
  )
}
