import Admin from '../Admin'
import AdminSignin from '../Admin-Signin'
import AdminSignout from '../Admin-Signout'
import AdminList from '../Admin-List'
import AdminContent from '../Admin-Content'
import AdminNew from '../Admin-New'
import AdminDelete from '../Admin-Delete'
import AdminMedia from '../Admin-Media'
import AdminQueries from '../Admin-Queries'
import AdminResources from '../Admin-Resources'
import AdminAdmins from '../Admin-Admins'
import Comments from '../Comments'
import Navigation from '../Navigation'

import RedirectToMainSite from '../Redirect-to-Site'

export default [
  {
    path: "/",
    exact: true,
    component: Admin
  },
  {
    path: "/signin",
    component: AdminSignin
  },
  {
    path: "/signout",
    component: AdminSignout
  },
  {
    path: ["/pages", "/events", "/blog", "/meta", "/alerts", "/news"],
    exact: true,
    component: AdminList
  },
  {
    path: ["/events/new", "/blog/new", "/alerts/new", "/news/new"],
    exact: true,
    component: AdminNew
  },
  {
    path: ["/events/delete/:id", "/blog/delete/:id", "/alerts/delete/:id", "/news/delete/:id"],
    exact: true,
    component: AdminDelete
  },
  {
    path: ["/pages/:id", "/events/:id", "/blog/:id", "/meta/:id", "/alerts/:id", "/news/:id"],
    component: AdminContent
  },
  {
    path: "/media",
    component: AdminMedia
  },
  {
    path: "/queries",
    component: AdminQueries
  },
  {
    path: "/comments",
    component: Comments
  },
  {
    path: "/admins",
    component: AdminAdmins
  },
  {
    path: "/resources",
    component: AdminResources
  },
  {
    path: "/nav",
    component: Navigation
  },
  {
    path: "*",
    component: RedirectToMainSite
  }
]