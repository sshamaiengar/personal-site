import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostListing = ({ post, showTags }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <div className="post-listing">
            <Link to={url}>
                <p class="post-listing-title">{post.title}</p>
            </Link>
            <p class="post-listing-excerpt">{post.excerpt}</p>
            <div className="post-listing-footer">
                {post.tags && showTags && <div className="post-listing-tags"> <Tags post={post} visibility="public" autolink={false} /></div>} 
                {post.tags && showTags && <div className="post-listing-tags">–</div>}
                <div className="post-listing-reading-time">{readingTime}</div>
            </div>
            
        </div>
    )

        // <Link to={url} className="post-card">
        //     <header className="post-card-header">
        //         {post.feature_image &&
        //             <div className="post-card-image" style={{
        //                 backgroundImage: `url(${post.feature_image})` ,
        //             }}></div>}
        //         {post.tags && <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={false} /></div>}
        //         {post.featured && <span>Featured</span>}
        //         <h2 className="post-card-title">{post.title}</h2>
        //     </header>
        //     <section className="post-card-excerpt">{post.excerpt}</section>
        //     <footer className="post-card-footer">
        //         <div className="post-card-footer-left">
        //             <div className="post-card-avatar">
        //                 {post.primary_author.profile_image ?
        //                     <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
        //                     <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
        //                 }
        //             </div>
        //             <span>{ post.primary_author.name }</span>
        //         </div>
        //         <div className="post-card-footer-right">
        //             <div>{readingTime}</div>
        //         </div>
        //     </footer>
        // </Link>
}

PostListing.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    showTags: PropTypes.bool.isRequired
}

export default PostListing
