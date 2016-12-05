import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import MDEditor from 'react-mdeditor'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import notify from 'notify'

class BlogEditForm extends React.Component {
  state = {
    title: '',
    visibility: 0,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.blog !== this.props.blog) {
      this.setState({
        title: nextProps.blog.title,
        visibility: nextProps.blog.visibility,
      })
      this.editor.codeMirror.setValue(nextProps.blog.content)
    }
  }
  handleTitle = (e) => this.setState({ title: e.target.value })
  handleVisibility = (e) => this.setState({
    visibility: e.target.checked ? 0 : 1,
  })
  handleSubmit = () => {
    const postData = {
      title: this.state.title,
      visibility: this.state.visibility,
      content: this.editor.codeMirror.getValue(),
      contentType: 'markdown',
    }
    if (this.verifyPostData(postData)) {
      this.props.onSubmit(postData)
    }
  }
  verifyPostData = ({ title, content }) => {
    if (!title) {
      notify.warn('标题不能为空！')
      return false
    }
    if (!content) {
      notify.warn('内容不能为空！')
      return false
    }
    return true
  }
  render() {
    const { title, visibility } = this.state
    return (
      <div>
        <TextField
          hintText="标题"
          fullWidth
          value={title}
          onChange={this.handleTitle}
        /><br />
        <div style={{ position: 'relative', width: '80px' }}>
          <Toggle
            toggled={visibility === 0}
            label="公开"
            onToggle={this.handleVisibility}
          />
        </div>
        <div style={{ marginTop: '15px' }}>
          <MDEditor
            zIndex={2000}
            ref={(editor) => (this.editor = editor)}
          />
        </div>
        <div style={{ marginTop: '15px', display: 'flex' }}>
          <div style={{ flex: 1 }} />
          <RaisedButton
            label="保存"
            primary
            onTouchTap={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

BlogEditForm.propTypes = {
  blog: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}
export default BlogEditForm
