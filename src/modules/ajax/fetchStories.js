import Vue from 'vue'
import Resource from 'vue-resource'
import dateChange from '../common/dateChange.js'
import {setSessionStorage, removeSessionStorage} from '../sessionStorage/sessionStorage'

export default function fetchStories (self, method = 'latest') {
  Vue.use(Resource)

  let url = '/zhihudaily/api/4/news/'
  if (method === 'latest') {
    url += 'latest'
  } else {
    url += 'before/' + self.currentNewsDate
  }
  self.$http.get(url).then(function (response) {
    // this.data = response.data
    response.data.dateStr = dateChange(response.data.date)
    let index = 0
    for (index in response.data.stories) {
      response.data.stories[index].src = response.data.stories[index].images[0]
      response.data.stories[index].url = '/stories/' + response.data.stories[index].id
    }
    index = 0
    for (index in response.data.top_stories) {
      response.data.top_stories[index].img = response.data.top_stories[index].image
    }
    // return response.data
    if (self.data[0] && self.data[0].date === response.data.date) {
      self.data.shift()
    }
    self.data.push(response.data)
    removeSessionStorage('storiesData')
    setSessionStorage('storiesData', self.data)
    self.sessionStorage = true
    self.currentNewsDate = response.data.date
    self.topStories = self.data[0].top_stories
  })
}
