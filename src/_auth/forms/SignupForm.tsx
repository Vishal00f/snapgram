import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
const formSchema = z.object({
   username: z.string().min(2,{message:'too short'}).max(50),
  password:z.string().min(8,{message:'password must be at least 8 characters'}),
  name:z.string().min(2).max(50),
  email:z.string().email()


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
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useAuthContext } from "@/context/AuthContext"


function SignupForm() {
  const {toast} = useToast()
  
  const {mutateAsync:createUserAccount,isPending:isCreatingUser} = useCreateUserAccount()
  const {mutateAsync:signInAccount, isPending:isSigningIn} = useSignInAccount()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password:"",
      name:"",
      email:""
    },
  })
  //destructoring values from auth context 
  const {checkAuthUser}=useAuthContext()

  const navigate = useNavigate()
  // 2. Define a submit handler.
  async function handleSignup(values: z.infer<typeof formSchema>) {
    try {
      
    
    const newUser =await createUserAccount(values);
    if(!newUser){
      return toast({
        title: 'Sign up failed! Please try again.'
      })
    }
    
    else{
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
        navigate('/')
      }else{
         toast({title:"Sign up failed! Please try again"})
         return;
      }
    }
    
  } catch (error) {
      console.log(error);
      
  }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};


export default SignupForm