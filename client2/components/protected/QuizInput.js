import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import {
  getBlankQuest,
  getQuestFromProps,
  getQuizStatefromQuest
} from '../../libs/quizHelper'

class QuizInput extends Component {
  constructor (props, context) {
    super(props, context)
    let quest = getQuestFromProps(props.quest)
    this.state = getQuizStatefromQuest(quest)
  }

  handleSubmit (e) {
    const { newQuiz, onSave } = this.props

    // Save quiz
    const { subject, question, choice_0, choice_1, choice_2 } = this.state
    onSave({ subject, question, choice_0, choice_1, choice_2 })

    if (newQuiz) {
      this.setState(getBlankQuest())
    }
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDoubleClick (form) {
    this.setState({ isEditing: { [form]: true } })
  }

  handleBlur (form) {
    const { newQuiz, onSave } = this.props
    if (!newQuiz) {
      let keys = form.split('_')
      let quiz = keys[0] === 'choice'
        ? { [keys[1]]: this.state[form] }
        : { [form]: this.state[form] }
      let isChoice = keys[0] === 'choice'
      onSave(quiz, isChoice)
      this.setState({ isEditing: { [form]: false } })
    }
  }

  renderForm (form, autoFocus) {
    const { newQuiz } = this.props
    if (this.state.isEditing[form] || newQuiz) {
      return (
        <div>
          {form}:
          <input
            type='text'
            name={form}
            placeholder={form + '??'}
            value={this.state[form]}
            autoFocus={autoFocus}
            onChange={this.handleChange.bind(this)}
            onBlur={() => this.handleBlur(form)}
          />
        </div>
      )
    } else {
      return (
        <div>
          <label onDoubleClick={() => this.handleDoubleClick(form)}>
            {form}: {this.state[form]}
          </label>
          <br />
        </div>
      )
    }
  }

  renderSubmitButton () {
    const { newQuiz } = this.props
    if (newQuiz) {
      return <button onClick={() => this.handleSubmit()}>Submit</button>
    }
  }

  render () {
    const { newQuiz } = this.props
    const autoFocus = true
    return (
      <div>
        {this.renderForm('subject', autoFocus)}
        {this.renderForm('question')}
        {this.renderForm('choice_0')}
        {this.renderForm('choice_1')}
        {this.renderForm('choice_2')}
        {newQuiz ? this.renderSubmitButton() : <br />}
      </div>
    )
  }
}

QuizInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  quest: PropTypes.object,
  newQuiz: PropTypes.bool
}

export default QuizInput
