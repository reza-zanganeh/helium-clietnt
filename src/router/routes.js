// components
import Home from '../pages/Home.vue'
import Single from '../pages/Single.vue'
import Bookmark from '../pages/Bookmark.vue'
import ArticleWriting from '../pages/articleWriting.vue'
// register
import Register from '../pages/Register.vue'
import OtpRequets from '../components/forms/register/OtpRequets.vue'
import OtpVerify from '../components/forms/register/OtpVerify.vue'
import SignUp from '../components/forms/register/SignUp.vue'
import Done from '../components/forms/register/Done.vue'
// search
import SearchResults from '../pages/SearchResults.vue'
import SearchResultArticles from '../components/search/Articles.vue'
import SearchResultSubjects from '../components/search/Subjects.vue'
import SearchResultUsers from '../components/search/Users.vue'
import Profile from '../pages/Profile.vue'
import ProfileAbout from '../components/profile/About.vue'
import ProfileAticles from '../components/profile/Aticles.vue'
import ProfileFallowers from '../components/profile/Fallowers.vue'
import ProfileSetings from '../pages/ProfileSetings.vue'
import page404 from '../pages/errorPage/404.vue'

export default [
  // public path
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    name: 'home',
    props: true
  },
  {
    path: '/article/:id',
    component: Single,
    props: true,
    name: 'articleDetails'
  },
  // requiresUnAuth
  {
    path: '/login',
    component: Register,
    children: [
      {
        path: '',
        component: OtpRequets,
        meta: {
          requiresUnauth: true,
          outRequest: false
        }
      },
      {
        path: 'otpVerify',
        component: OtpVerify,
        meta: { otpVerify: false },
        beforeEnter: (_, from, next) => {
          if (!from.meta.outRequest) next('/login')
          else next(true)
        }
      },
      {
        path: 'signup',
        component: SignUp,
        meta: { signup: false },
        beforeEnter: (_, from, next) => {
          if (!from.meta.otpVerify) next('/login')
          else next(true)
        }
      },
      {
        path: 'done',
        component: Done,
        beforeEnter: (_, from, next) => {
          if (!from.meta.signup) next('/login')
          else next(true)
        }
      }
    ]
  },
  // requiresAuth
  { path: '/bookmark', component: Bookmark, meta: { requiresAuth: true } },
  {
    path: '/article/write',
    component: ArticleWriting,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchResults,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: SearchResultArticles
      },
      { path: 'users', component: SearchResultUsers },
      { path: 'subjects', component: SearchResultSubjects }
    ]
  },
  { path: '/profileSteing', component: ProfileSetings },
  {
    path: '/profile/:userId',
    component: Profile,
    props: true,
    children: [
      {
        path: '',
        component: ProfileAbout
      },
      { path: 'articles', component: ProfileAticles },
      { path: 'fallowers', component: ProfileFallowers }
    ]
  },
  { path: '/:pageNotFound(.*)', component: page404 }
]
