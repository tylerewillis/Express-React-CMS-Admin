import Admin from '../Admin'
import Signin from '../Signin'
import Signout from '../Signout'
import ResetPassword from '../Reset-Password'
import List from '../List'
import Content from '../Content'
import New from '../New'
import Delete from '../Delete'
import Media from '../Media'
import Queries from '../Queries'
import Documentation from '../Documentation'
import Admins from '../Admins'
import Comments from '../Comments'
import Navigation from '../Navigation'
import Form from '../Form'
import Shop from '../Shop'
import Config from '../Config'
import RedirectToMainSite from '../Redirect-to-Site'
import FileSharing from '../File-Sharing'

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
    path: "/documentation",
    component: Documentation
  },
  {
    path: "/documentation/:id",
    component: Documentation
  },
  {
    path: "/shop",
    component: Shop
  },
  {
    path: "/file-share",
    component: FileSharing
  },
  {
    path: "/config",
    component: Config
  },
  {
    path: "/password-reset",
    component: ResetPassword
  },
  {
    path: "/password-reset/:code/:email",
    component: ResetPassword
  },
  {
    path: "/:id",
    exact: true,
    component: List
  },
  {
    path: "/:id/new",
    exact: true,
    component: New
  },
  {
    path: "/:id/delete/:id",
    exact: true,
    component: Delete
  },
  {
    path: ["/forms/:id"],
    component: Form
  },
  {
    path: ["/navigations/:id"],
    component: Navigation
  },
  {
    path: "/:id/:id",
    component: Content
  },
  {
    path: "*",
    component: RedirectToMainSite
  }
]