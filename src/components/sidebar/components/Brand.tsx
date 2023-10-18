// Chakra imports
import { Flex, useColorModeValue, Image, Text } from '@chakra-ui/react';
import logoITS from 'assets/img/layout/logoITS.png'
// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image h='60px' w='125px' src={logoITS} />
			<Text mt='10px' mb='10px' color={logoColor} size='xl'><span className='font-semibold'>ITS</span> Learning Management System</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
