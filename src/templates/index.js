import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import { Layout, PostCard, Pagination, PostListing } from '../components/common'
import { MetaData } from '../components/common/meta'

import { latestPosts } from '../utils/siteConfig'
import headshot from '../images/cool_headshot.png'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const indexUrl = `/blog/`

const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <section className="site-intro">
                        <div className="grid-child">
                            <h1 style={{fontSize: '40px'}}>Hi.</h1>
                            <p style={{fontSize: '24px', lineHeight: '39px'}}>I'm Stephen. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet rhoncus eros. Maecenas sed justo vehicula ex blandit molestie at et nibh. Integer pharetra rhoncus turpis nec hendrerit.</p>
                        </div>
                        <div className="grid-child site-intro-img">
                            <img src={headshot} alt="Headshot"/>
                        </div>
                    </section>
                    <section className="post-feed">
                        <div className="post-feed-header">
                            <h2>Latest Posts</h2>
                            <div style={{alignItems: 'center'}}>
                                <Link to={indexUrl}>All posts</Link>
                            </div>
                        </div>
                        {posts.slice(0, latestPosts).map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            // <PostCard key={node.id} post={node} />
                            <PostListing key={node.id} post={node} />
                        ))}
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
