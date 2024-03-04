import { greeting } from ':stores/store_greeting'

greeting.subscribe(function run($greeting) {
  console.log($greeting)
})

greeting.set('hello world')
