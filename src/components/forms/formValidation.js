/** @format */

export default function() {
  const notEmpty = str => str.length > 0

  const isValidEmail = email => /^[\w_.-]+@[\w]+\.[\w]{2,4}$/gi.test(email)

  const isPhoneNumber = phone => /^09\d{9}$/g.test(phone)

  const isUsername = username =>
    /^[a-zA-Z]+[a-zA-Z0-9_]{4,}[^_]$/g.test(username)
  const isName = name =>
    /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]{3,100}$/g.test(name)

  const isBio = bio => typeof bio === 'string' && bio.length <= 100

  const isShortStory = story =>
    /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیA-Za-z0-9.\n]{0,160}$/g.test(story)

  const isCommentContent = content => /^.{4,}$/g.test(content)

  const isArtileTitle = title =>
    /^[A-Za-z0-9 آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]{5,250}$/g.test(title)

  const isArticleContent = content =>
    typeof content === 'string' && content.length >= 100

  return {
    isValidEmail,
    isPhoneNumber,
    isUsername,
    isName,
    isBio,
    isCommentContent,
    isArtileTitle,
    isArticleContent,
    isShortStory,
    notEmpty
  }
}
