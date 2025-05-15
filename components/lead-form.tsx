"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Check, Loader2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { submitLead } from "@/lib/actions"

const visaOptions = [
  { id: "q1_exchange_visitor", label: "Q-1" },
  { id: "eb1a_extraordinary_ability", label: "EB-1A" },
  { id: "eb2_niw_national_interest_waiver", label: "EB-2 NIW" },
  { id: "unknown_visa_type", label: "I don't know" }
]

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  linkedinProfile: z.string().url({
    message: "Please enter a valid LinkedIn URL.",
  }),
  visasOfInterest: z.array(z.string()).min(1, {
    message: "Please select at least one visa type.",
  }),
  resume: z.instanceof(File, {
    message: "Please upload your resume/CV.",
  }),
  additionalInfo: z.string().optional(),
})

export function LeadForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      linkedinProfile: "",
      visasOfInterest: [],
      additionalInfo: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // In a real application, you would upload the file and submit the form data
      // For this example, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Call the server action to submit the lead
      await submitLead({
        ...values,
        resumeFileName: values.resume.name,
      })

      setIsSuccess(true)
      toast({
        title: "Form submitted successfully",
        description: "Thank you for your submission. We'll be in touch soon.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your form could not be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      form.setValue("resume", file)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="">
          <div className="flex flex-col items-center justify-center space-y-4 text-center py-10">
            <div className="flex justify-center">
              <img
                src="/info.png"
                alt="info_icon"
                className="rounded-lg"
                width={80}
              />
            </div>
            <h2 className="text-2xl font-bold">Thank you</h2>
            <p className="text-muted-foreground max-w-md">
              Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.
            </p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Go back to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col">
      {!isSubmitting ? (

        <div className="mb-8">
          <div className="mb-8 flex justify-center">
            <img
              src="/info.png"
              alt="info_icon"
              className="rounded-lg"
              width={80}
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-center">Want to understand your visa options?</h1>
          <p className="mt-6 font-bold text-center">
            Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
          </p>
        </div>
      ) : <></>}

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
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
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile *</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <img
                    src="/dices.png"
                    alt="Visa Options"
                    className="rounded-lg"
                    width={150}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="visasOfInterest"
                  render={() => (
                    <FormItem>
                      <div className="mb-4 flex justify-center">
                        <FormLabel className="font-bold text-lg">Visas categories of interest?</FormLabel>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        {visaOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="visasOfInterest"
                            render={({ field }) => {
                              return (
                                <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option.id])
                                          : field.onChange(field.value?.filter((value) => value !== option.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{option.label}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <FormField
                control={form.control}
                name="resume"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Resume/CV Upload *</FormLabel>
                    <FormControl>
                      <div className="grid w-full items-center gap-1.5">
                        <label
                          htmlFor="resume-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                            {selectedFile && (
                              <p className="mt-2 text-sm text-green-600 font-medium">{selectedFile.name}</p>
                            )}
                          </div>
                          <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleFileChange}
                            {...fieldProps}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col">
                <div className="mb-2 flex justify-center">
                  <img
                    src="/heart.png"
                    alt="Visa Options"
                    className="rounded-lg"
                    width={80}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-center">
                        <FormLabel className="text-lg font-bold">How can we help you?</FormLabel>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Please share any additional information that might be relevant..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>

  )
}
