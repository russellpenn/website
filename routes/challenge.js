                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             'use strict'

const Debug = require('debug')
const debug = new Debug('app:routes/events.js')

module.exports.init = router => {
  router.get('/challenges', index)
  router.get('/challenge', redir)
  router.get('/challenge/:id', details)
}

const index = async ctx => {
  debug('rendering challenges page')
  await ctx.render('new/challenge/challenges', {
    challenges
  })
}

const redir = async ctx => {
  debug('redirecting to challenges page')
  ctx.redirect('/challenges')
}

const details = async ctx => {
  debug('rendering challenge details page')
  var challenge = challenges[ctx.params.id]
  if (challenge == null) {
	  ctx.redirect('challenges')
  }
  else {
	  await ctx.render('new/challenge/details', {
	    challenge
	  })
  }
}

const challenges = [
	Piprime: {
		name: 'Pi prime',
		task: '',
		difficulty: 3
	}
]
