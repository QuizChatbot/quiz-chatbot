const summary = require('../summary')


describe('calculateTotalScore', () => {
    it('calculate total score of all questions by totalQuestions*15 ', () => {
        expect(summary.calculateTotalScore(10)).toBe(150)
    })
}) 

describe('calculateScoreForThatQuestion (score that user gets)', () => {
    test('calculate score for that question => Correct , duration < 1min, point 10', () => {
        expect(summary.calculateScoreForThatQuestion(10, true, 4806)).toBe(15)
    })

    test('calculate score for that question => Correct , duration > 1min, point 10', () => {
        expect(summary.calculateScoreForThatQuestion(10, true, 70000)).toBe(13)
    })

    test('calculate score for that question => Wrong , duration < 1min, point 10', () => {
        expect(summary.calculateScoreForThatQuestion(10, false, 4806)).toBe(0)
    })

    test('calculate score for that question => Wrong , duration > 1min, point 10', () => {
        expect(summary.calculateScoreForThatQuestion(10, false, 70000)).toBe(0)
    })
})

describe('calculateGrade from totalScore and userScore', () => {
    it('userScore = 90. Grade should be A+ ', () => {
        expect(summary.calculateGrade(100, 90)).toBe("A+")
    })
      it('userScore = 85. Grade should be A ', () => {
        expect(summary.calculateGrade(100, 85)).toBe("A")
    })
      it('userScore = 80. Grade should be A- ', () => {
        expect(summary.calculateGrade(100, 80)).toBe("A-")
    })
      it('userScore = 78. Grade should be B+ ', () => {
        expect(summary.calculateGrade(100, 78)).toBe("B+")
    })
      it('userScore = 75. Grade should be B ', () => {
        expect(summary.calculateGrade(100, 75)).toBe("B")
    })
      it('userScore = 70. Grade should be A+  ', () => {
        expect(summary.calculateGrade(100, 70)).toBe("B-")
    })
      it('userScore = 68. Grade should be C+ ', () => {
        expect(summary.calculateGrade(100, 68)).toBe("C+")
    })
      it('userScore = 65. Grade should be C ', () => {
        expect(summary.calculateGrade(100, 65)).toBe("C")
    })
      it('userScore = 60. Grade should be C- ', () => {
        expect(summary.calculateGrade(100, 60)).toBe("C-")
    })
      it('userScore = 58. Grade should be D+ ', () => {
        expect(summary.calculateGrade(100, 58)).toBe("D+")
    })
      it('userScore = 55. Grade should be D ', () => {
        expect(summary.calculateGrade(100, 55)).toBe("D")
    })
      it('userScore = 50. Grade should be D- ', () => {
        expect(summary.calculateGrade(100, 50)).toBe("D-")
    })
      it('userScore < 50. Grade should be F ', () => {
        expect(summary.calculateGrade(100, 49)).toBe("F")
    })
}) 

// describe('prepareSummary to save to firebase', () => {
//     test('calculate score for that question => Correct , duration < 1min, point 10', () => {
//         expect(summary.calculateScoreForThatQuestion(10, true, 4806)).toBe(15)
//     })
// })