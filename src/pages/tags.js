import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import { Layout, PostCard, Pagination, PostListing } from '../components/common'
import { MetaData } from '../components/common/meta'

const blogUrl = `/blog/`

const Tags = ({ data, location, pageContext }) => {
    const tags = data.allGhostTag.edges

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        <div className="post-feed-header all-post-feed-header">
                            <h1>Tags</h1>
                            <div style={{alignItems: 'center'}}>
                                <Link to={blogUrl}>All posts</Link>
                            </div>
                        </div>
                        {tags.map(({ node }) => {
                            if (node.postCount > 0) {
                                return (
                                    // The tag below includes the markup for each post - components/common/PostCard.js
                                    // <PostCard key={node.id} post={node} />
                                    <div className="tag-listing">
                                    <Link to={`/tag/${node.slug}/`}>{node.name}</Link>
                                        <div>({node.postCount})</div> 
                                    </div>
                                    
                                )
                            }
                        })}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}


export default Tags

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostAllTagsQuery {
    allGhostTag(sort: { order: ASC, fields: name }) {
        edges {
            node {
                name
                slug
                url
                postCount
            }
        }
    }
  }
`