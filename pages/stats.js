import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'

import NewsletterForm, { BlogNewsletterForm } from '@/components/NewsletterForm'
import Card from '@/components/Card'

import projectsData from '@/data/projectsData'
import ListLayout from '@/layouts/ListLayout'
import WakaTimeData from './api/WakatimeData'
import WakaTimeChart from './api/WakatimeChart'

const MAX_DISPLAY = 2

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Stats({ posts }) {
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
              Stats!
            </h1>
          </div>
          <WakaTimeChart width="100%" height="100vh" />
          {/* <div>
            <a href="https://wakatime.com/@61dab172-08f9-4642-b8e2-a2302702f4f2" target="_blank" rel="noreferrer">
                <Image unoptimized width="250" height="30" src="https://wakatime.com/badge/user/61dab172-08f9-4642-b8e2-a2302702f4f2.svg?style=for-the-badge" alt="Total time coded since Jan 30 2023" />
            </a>
          </div> */}
        </div>
      </div>
    </>
  )
}
