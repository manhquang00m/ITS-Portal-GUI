/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react';

export function SidebarLinks(props: {
	routes: RoutesType[];
}) {
	//   Chakra color mode
	let location = useLocation();
	let activeColor = useColorModeValue('gray.700', 'white');
	let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
	let activeIcon = useColorModeValue('brand.500', 'white');
	let textColor = useColorModeValue('secondaryGray.500', 'white');
	let brandColor = useColorModeValue('brand.500', 'brand.400');

	const { routes } = props;

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		console.log(location.pathname, '---', routeName)
		return location.pathname.includes(routeName);
	};

	// this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
	const createLinks = (
		routes: RoutesType[],
	) => {
		return routes.filter((item) => !item?.hidden).map(
			(
				route: RoutesType,
				index: number
			) => {
				return (!route?.children ?
					<NavLink key={index} to={route.layout + route.path}>
						<Box>
							<HStack
								spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
								py='5px'
								ps='10px'>
								<Flex w='100%' alignItems='center' justifyContent='center'>
									<Box
										color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
										me='18px'>
										{route.icon}
									</Box>
									<Text
										me='auto'
										color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
										fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
										{route.name}
									</Text>
								</Flex>
								<Box
									h='36px'
									w='4px'
									bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
									borderRadius='5px'
								/>
							</HStack>
						</Box>
					</NavLink> :
					<Box>

						<Menu>
							<Accordion allowToggle >
								<AccordionItem className='border-y-0'>
									<HStack
										spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Flex w='100%' alignItems='center' justifyContent='center'>
											<Box
												color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
												me='18px'>
												{route.icon}
											</Box>

											<AccordionButton className='w-full hover:bg-transparent focus:shadow-none pl-0'>
												<Text
													me='auto'
													color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
													fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
													{route.name}
												</Text>
												<AccordionIcon />
											</AccordionButton>

										</Flex>
										<Box
											h='36px'
											w='4px'
											bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
											borderRadius='5px'
										/>
									</HStack>

									<AccordionPanel pb={4} pl={'48px'} pt={0}>
										{
											route.children.map((chilRoute: any, index: number) => {

												return <NavLink key={index} to={route.layout + route.path + chilRoute.path}>
													<Text
														mb={2}
														me='auto'
														color={activeRoute(chilRoute.path.toLowerCase()) ? activeColor : textColor}
														fontWeight={activeRoute(chilRoute.path.toLowerCase()) ? 'bold' : 'normal'}>
														{chilRoute.name}
													</Text>
												</NavLink>
											})
										}
									</AccordionPanel>
								</AccordionItem>
							</Accordion>

						</Menu>
					</Box>
				);
			}
		);
	};
	//  BRAND
	return <>{createLinks(routes)}</>
}

export default SidebarLinks;
