import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import { Layout, PostCard, Pagination, PostListing } from '../components/common'
import { MetaData } from '../components/common/meta'

const tagsUrl = `/tags/`

const Blog = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        {posts.length > 0 ? ([
                            <div className="post-feed-header all-post-feed-header">
                                <h1>Posts</h1>
                                <div style={{alignItems: 'center'}}>
                                    <Link to={tagsUrl}>Tags</Link>
                                </div>
                            </div>,
                            posts.map(({ node }) => (
                                // The tag below includes the markup for each post - components/common/PostCard.js
                                // <PostCard key={node.id} post={node} />
                                <PostListing key={node.id} post={node} showTags={true}/>
                            ))
                        ]) : (
                            <div className="post-feed-header all-post-feed-header">
                                <p>Nothing here yet...</p>
                            </div>
                        )}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Blog.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Blog

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostAllPostQuery {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`