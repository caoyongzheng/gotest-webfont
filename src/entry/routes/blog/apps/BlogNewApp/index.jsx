import React from 'react'
import BlogEditForm from '../../components/BlogEditForm'
import notify from 'notify'
import R from 'R'
import fetch2 from 'fetch2'
import C from 'C'

const styles = {
  stage: {
    maxWidth: '980px',
    margin: '0 auto',
    padding: '0 1em',
  },
}

class BlogNewApp extends React.Component {
  onSubmit = (postData) => {
    fetch2(`${C.Host}/api/blog`, {
      method: 'POST',
      body: JSON.stringify(postData),
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        notify.success('添加博文成功')
        R.BlogView.go({ blogId: result.data })
      } else {
        notify.error(result.desc)
      }
    })
    .catch((error) => {
      notify.error(error.message)
    })
  }
  render() {
    return (
      <div style={styles.stage}>
        <div style={{ marginTop: '20px' }}>
          <BlogEditForm onSubmit={this.onSubmit} />
        </div>
      </div>
    )
  }
}
module.exports = BlogNewApp
