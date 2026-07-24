import Tweet from 'components/Tweet'
import NewReply from 'components/NewReply'
import DeleteTweetButton from 'components/DeleteTweetButton'
import { getTweet, getReplies } from 'lib/data.js'
import Tweets from 'components/Tweets'
import PageContainer from 'components/PageContainer'
import prisma from 'lib/prisma'
import { useRouter } from 'next/router'

export default function SingleTweet({ tweet, replies }) {
  const router = useRouter()

  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.parent_data.author.name}/status/${tweet.parent}`)  }

  return (
    <PageContainer title='Tweet'>
      <Tweet tweet={tweet} />
      <NewReply tweet={tweet} />
      <DeleteTweetButton tweet={tweet} />
      <Tweets tweets={replies} nolink={true}/>
    </PageContainer>
  )
}



export async function getServerSideProps({ params }) {
	let tweet = await getTweet(params.id, prisma)
  tweet = JSON.parse(JSON.stringify(tweet))

  let replies = await getReplies(params.id, prisma)
  replies = JSON.parse(JSON.stringify(replies))

  return {
    props: {
      tweet,
      replies,
    },
  }
}