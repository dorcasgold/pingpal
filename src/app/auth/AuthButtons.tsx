"use client";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {

	return (
		<div className='flex gap-2'>
			<Button className='w-full' variant={"secondary"} >
					Sign up
				</Button>
			<Button className='w-full'>
					Login
				</Button>
		</div>
	);
};
export default AuthButtons;