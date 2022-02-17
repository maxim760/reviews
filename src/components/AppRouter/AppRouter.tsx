import {Routes, Route, Navigate, useLocation } from "react-router-dom"
import { RedirectPath, routes } from "../../utils/router/routes"
import Box from "@mui/material/Box"
import { TransitionGroup, CSSTransition } from "react-transition-group";
// https://codesandbox.io/s/l9m3zrj4lq?file=/src/components/Container.js:1028-1440 - анимации отсюда

const durationMS = 300

const boxStyle = {
  '& .fade-enter': {
    opacity: 0.01,
  },
  '&, & .fade, & .transition-group, & .route-section': {
    height: "100%"
  },
  '& .fade-enter.fade-enter-active': {
    opacity: 1,
    transition: `opacity ${durationMS}ms ease-in`,
  },

  '& .fade-exit': {
    opacity: 1,
  },

  '& .fade-exit.fade-exit-active': {
    opacity: 0.01,
    transition: `opacity ${durationMS}ms ease-in`,
  },

  '& div.transition-group': {
    position: 'relative',
  },

  '& section.route-section': {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  }
}

export const AppRouter = () => {
  const location = useLocation()
  return (
    <Box sx={boxStyle} >
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: durationMS, exit: durationMS }}
          classNames="fade"
        >
          <section className="route-section">
            <Routes location={location}>
              {routes.map(({ Page, path }) => (
                <Route
                  key={path}
                  element={<Page />}
                  path={path}
                  index={path === "/"} />
                ))}
              <Route
                path="*"
                element={<Navigate to={RedirectPath} />}
              />
            </Routes>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </Box>
  )
}