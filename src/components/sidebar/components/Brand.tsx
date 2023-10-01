// Chakra imports
import { Flex, useColorModeValue, Image, Text } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image h='40px' w='175px' src='https://cdn0257.cdn4s.com/media/logo-02%20(1)-01.png' alt='logo' />
			<Text color={logoColor} size='xl'><span className='font-semibold'>ITS</span> Learning Management System</Text>
			<HSeparator mt='20px' mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
