import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import { Layout, PostCard, Pagination, PostListing } from '../components/common'
import { MetaData } from '../components/common/meta'

import { latestPosts } from '../utils/siteConfig'
import headshot from '../images/headshot-2023-small.jpeg'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const blogUrl = `/blog/`

const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <section className="site-intro">
                        <div className="grid-child">
                            <h3 style={{fontSize: '40px'}}>Hey,</h3>
                            <p style={{fontSize: '20px', lineHeight: '36px'}}>I'm Stephen Shamaiengar (pronounced <i>shuh-MINE-gar</i>). I'm a software engineer at Microsoft in Seattle, working on Azure.</p>
                        </div>
                        <div className="grid-child site-intro-img">
                            <img src={headshot} alt="Headshot"/>
                        </div>
                    </section>
                        <section className="post-feed">
                            {posts.length > 0 ? ([
                                <div className="post-feed-header">
                                    <h2>Latest</h2>
                                    <div style={{alignItems: 'center'}}>
                                        <Link to={blogUrl}>All</Link>
                                    </div>
                                </div>,
                                posts.slice(0, latestPosts).map(({ node }) => (
                                    // The tag below includes the markup for each post - components/common/PostCard.js
                                    // <PostCard key={node.id} post={node} />
                                    <PostListing key={node.id} post={node} showTags={true}/>
                                ))
                            ]) : (
                                <div className="post-feed-header all-post-feed-header">
                                </div>
                            )}
                        </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
