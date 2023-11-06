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
			<Image h='60px' w='125px' src={"https://lh3.googleusercontent.com/pw/ADCreHf0g1SLGLzS1gZs52Fsmu-Dq_9tII3EPAhr1EH9QUHvLeYJuGCd1hOocTfiuvKNcry_OWCyzptc81V0he-saQTnvYEtalH7uSfgsCFlM7koMLnt667y-ChdGsO8-WHKihz2Bgzism0wGOpkFF4uitiB=w1574-h868-s-no"} />
			<Text mt='10px' mb='10px' color={logoColor} size='xl'><span className='font-semibold'>ITS</span> Learning Management System</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
