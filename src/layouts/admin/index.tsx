// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
// Layout components
import Navbar from "components/navbar/NavbarAdmin";
import Sidebar from "components/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

export const getBreadcrumb = (routes: RoutesType[]): BreadcrumbType[] => {
  const listbreadcrumb: BreadcrumbType[] = [];
  const url = window.location.href;
  const index = url.indexOf("#");
  const urlPath = url.substring(index + 1, url.length);
  const findBreadcrumb = (routes: RoutesType[]) => {
    for (const route of routes) {
      const routePath = route.path;
      if (urlPath.includes(routePath)) {
        listbreadcrumb.push({
          path: route.path,
          name: route.name,
        });
        if (route.children) {
          findBreadcrumb(route.children);
        }
      }
    }
  };

  findBreadcrumb(routes);
  return listbreadcrumb;
};
// Custom Chakra theme
export default function Dashboard(props: { [x: string]: any }) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes: RoutesType[]): string => {
    const defaultRoute = "Default Brand Text";
    const url = window.location.href;
    for (const route of routes) {
      const routePath = route.layout + route.path;
      if (url.includes(routePath)) {
        if (route.children) {
          for (const childRoute of route.children) {
            const childRoutePath = routePath + childRoute.path;
            if (url.includes(childRoutePath)) {
              return childRoute.name;
            }
          }
        }

        return route.name;
      }
    }
    return defaultRoute;
  };

  const getActiveNavbar = (routes: RoutesType[]): boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeNavbar;
  };
  // console.log(getActiveNavbarText(routes))
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.flatMap((route: RoutesType, key: any) => {
      if (route.children) {
        return route.children.flatMap((childRoute: any, index: number) => {
          if (childRoute?.children) {
            let listRouteDetail = childRoute.children.map(
              (detail: any, index: number) => {
                return (
                  <Route
                    path={
                      route.layout + route.path + childRoute.path + detail.path
                    }
                    component={detail.component}
                    key={index}
                  />
                );
              }
            );
            const flagRoute = (
              <Route
                path={route.layout + route.path + childRoute.path}
                component={childRoute.component}
                key={index}
              />
            );
            listRouteDetail.push(flagRoute);
            return listRouteDetail;
          }
          return (
            <Route
              path={route.layout + route.path + childRoute.path}
              component={childRoute.component}
              key={index}
            />
          );
        });
      }
      return (
        <Route
          path={route.layout + route.path}
          component={route.component}
          key={key}
        />
      );
    });
  };
  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={"Horizon UI Dashboard PRO"}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                breadCrumb={getBreadcrumb(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/" to="/admin/default" />
              </Switch>
            </Box>
          ) : null}
          {/* <Box>
						<Footer />
					</Box> */}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
