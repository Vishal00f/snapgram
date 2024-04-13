import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
const formSchema = z.object({
  email:z.string().email(),
  password:z.string().min(8,{message:'password must be at least 8 characters'})

})
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useAuthContext } from "@/context/AuthContext"


function SignupForm() {
  const {toast} = useToast()
  
  
  const {mutateAsync:signInAccount, isPending:isSigningIn} = useSignInAccount()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    email:'',
    password:''
    
    },
  })
  //destructoring values from auth context 
  const {checkAuthUser}=useAuthContext()

  const navigate = useNavigate()
  // 2. Define a submit handler.
  async function handleSignin(values: z.infer<typeof formSchema>) {
    try {
      
      const session = await signInAccount({
        email:values.email,
      password:values.password
      })
      if(!session) {
         toast({title:"sign in failed, Please try again."})
         navigate("/sign-in");
          
         return;
  
      }
      const isLoggedIn=await checkAuthUser();
      if(isLoggedIn){
        form.reset()
        console.log(isLoggedIn);
        
        navigate('/')
      }else{
         toast({title:"Sign in failed! Please try again"})
         return;
      }
    }
    
   catch (error) {
      console.log(error);
      
  }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">
          Login with your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};


export default SignupForm