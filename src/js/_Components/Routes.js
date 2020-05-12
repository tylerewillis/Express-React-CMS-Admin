import Admin from '../Admin'
import Signin from '../Signin'
import Signout from '../Signout'
import List from '../List'
import Content from '../Content'
import New from '../New'
import Delete from '../Delete'
import Media from '../Media'
import Queries from '../Queries'
import Resources from '../Resources'
import Admins from '../Admins'
import Comments from '../Comments'
import Navigation from '../Navigation'
import Form from '../Form'
import Shop from '../Shop'

import RedirectToMainSite from '../Redirect-to-Site'

export default [
  {
    path: "/",
    exact: true,
    component: Admin
  },
  {
    path: "/signin",
    component: Signin
  },
  {
    path: "/signout",
    component: Signout
  },
  {
    path: ["/pages", "/events", "/blog", "/meta", "/alerts", "/news", "/forms", "/products"],
    exact: true,
    component: List
  },
  {
    path: ["/pages/new", "/events/new", "/blog/new", "/alerts/new", "/news/new", "/forms/new", "/products/new"],
    exact: true,
    component: New
  },
  {
    path: ["/pages/delete/:id", "/events/delete/:id", "/blog/delete/:id", "/alerts/delete/:id", "/news/delete/:id", "/forms/delete/:id", "/products/delete/:id"],
    exact: true,
    component: Delete
  },
  {
    path: ["/pages/:id", "/events/:id", "/blog/:id", "/meta/:id", "/alerts/:id", "/news/:id", "/products/:id"],
    component: Content
  },
  {
    path: ["/forms/:id"],
    component: Form
  },
  {
    path: "/media",
    component: Media
  },
  {
    path: "/queries",
    component: Queries
  },
  {
    path: "/comments",
    component: Comments
  },
  {
    path: "/admins",
    component: Admins
  },
  {
    path: "/resources",
    component: Resources
  },
  {
    path: "/nav",
    component: Navigation
  },
  {
    path: "/shop",
    component: Shop
  },
  {
    path: "*",
    component: RedirectToMainSite
  }
]