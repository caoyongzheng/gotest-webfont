import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import BlogEditForm from '../../components/BlogEditForm'
import fetch2 from 'fetch2'
import C from 'C'
import R from 'R'
import notify from 'notify'

const styles = {
  stage: {
    maxWidth: '980px',
    margin: '0 auto',
    padding: '0 1em',
  },
}

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: {},
    }
  }
  componentDidMount() {
    const { location } = this.props
    this.getBlog(location.query.blogId)
  }
  getBlog = (blogId) => {
    fetch2(`${C.Host}/api/blog`, { qp: { blogId } })
    .then((response) => response.json())
    .then((result) => {
      const { success, data, desc } = result
      if (success) {
        this.setState({
          blog: data,
        })
      } else {
        notify.error(desc)
      }
    })
    .catch((error) => {
      notify.error(error.message)
    })
  }
  handleEdit = (postData) => {
    const { blogId } = this.props.location.query
    if (!blogId) {
      notify.error('博文Id不存在')
      return
    }
    fetch2(`${C.Host}/api/blog`, {
      method: 'PUT',
      body: JSON.stringify({ id: blogId, ...postData }),
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        notify.success('修改博文成功')
        R.BlogView.go({ blogId })
      } else {
        notify.error(result.desc)
      }
    })
    .catch((error) => {
      notify.error(error.message)
    })
  }
  render() {
    const { blog } = this.state
    return (
      <div style={styles.stage}>
        <div style={{ marginTop: '20px' }}>
          <BlogEditForm blog={blog} onSubmit={this.handleEdit} />
        </div>
      </div>
    )
  }
}
Edit.propTypes = {
  location: PropTypes.object.isRequired,
}
module.exports = withRouter(Edit)
