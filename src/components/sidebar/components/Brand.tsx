// Chakra imports
import { Flex, useColorModeValue, Image, Text } from '@chakra-ui/react';
import logo from 'assets/img/layout/logoITS.png'
// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image h='60px' w='125px' src={"https://static.vecteezy.com/system/resources/previews/006/153/221/original/defi-decentralized-finance-for-exchange-cryptocurrency-defi-text-logo-design-finance-system-block-chain-and-walllet-blue-dark-technology-system-with-alt-coin-icon-vector.jpg"} />
			<Text mt='10px' mb='10px' color={logoColor} size='xl'><span className='font-semibold'>DEFI</span> Passive Income </Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
