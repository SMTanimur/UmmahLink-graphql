"use client"

import React from 'react'
import { Card } from '../Card'
import { cn } from '../../lib'
import { ErrorMessage } from '../messages/ErrorMessage'
import { CardBody } from '../Card/CardBody'
import { Form } from '../form/Form'
import { Input } from '../input/Input'
import { TextArea } from '../input/TextArea'
import { Button } from '../button/Button'
import { usePost } from '../../hooks'
import { Spinner } from '../loading'
import { PencilIcon } from '@heroicons/react/24/outline'

export const NewCreatePost = () => {

  const {attemptToCreatePost,createPostLoading,postForm}=usePost()
  return (
    <Card
      className={cn(
        { '!rounded-b-xl !rounded-t-none border-none':'' },
        'pb-3'
      )}
    >
      <CardBody>

        <Form
          form={postForm}
          className="space-y-4"
          onSubmit={async ()=> await attemptToCreatePost()}
        >
          {/* {error && (
            <ErrorMessage
              className="mb-3"
              title={t`Transaction failed!`}
              error={error}
            />
          )} */}
        
         
          
          <TextArea
            label={`Bio`}
            placeholder={`Tell us something about you!`}
            {...postForm.register('content')}
          />
       
          <Button
            className="ml-auto"
            type="submit"
            disabled={createPostLoading}
            icon={
              createPostLoading? (
                <Spinner size="xs" />
              ) : (
                <PencilIcon className="h-4 w-4" />
              )
            }
          >
            <span>Save</span>
          </Button>
        </Form>
      </CardBody>

      </Card>
  )
}

