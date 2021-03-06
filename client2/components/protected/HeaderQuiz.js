import React, { PropTypes, Component } from 'react'
import QuizInput from './QuizInput'
import store from '../../store'

class HeaderQuiz extends Component {
  handleSave (quiz) {
    this.props.addQuiz(quiz)
  }

  render () {
    return (
      <header>
        <QuizInput newQuiz onSave={this.handleSave.bind(this)} />
      </header>
    )
  }
}

HeaderQuiz.propTypes = {
  addQuiz: PropTypes.func
}

export default HeaderQuiz
