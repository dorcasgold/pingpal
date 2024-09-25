"use client";
import { checkAuthStatus } from "@/actions/auth.actions";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
	const router = useRouter();
	const { data, error, isLoading } = useQuery({
		queryKey: ["authCheck"],
		queryFn: async () => await checkAuthStatus(),
	});

	useEffect(() => {
		if (data?.success) {
			router.push("/");
		}
	}, [data, router]);

	if (isLoading) {
		return (
			<div className='mt-20 w-full flex justify-center'>
				<div className='flex flex-col items-center gap-2'>
					<Loader className='w-10 h-10 animate-spin text-muted-foreground' />
					<h3 className='text-xl font-bold'>Redirecting...</h3>
					<p>Please wait</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='mt-20 w-full flex justify-center'>
				<div className='flex flex-col items-center gap-2'>
					<h3 className='text-xl font-bold text-red-600'>An error occurred:</h3>
					 <Link href="/" className=" underline text-blue-500 cursor-pointer">Click here to Go Home</Link>
				</div>
			</div>
		);
	}

	return null; // Or a fallback UI if needed
};

export default Page;
