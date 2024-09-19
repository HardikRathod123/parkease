import { useMutation } from '@apollo/client'
import { useFormCreateValet } from '@parkease/forms/src/createValet'
import { CreateValetDocument } from '@parkease/network/src/gql/generated'
import { useCloudinaryUpload } from '@parkease/util/hooks/cloudinary'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'
import { Form } from '../atoms/Form'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { ImagePreview } from './ImagePreview'

export const AddValet = () => {
  const {
    register,
    resetField,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormCreateValet()
  const [open, setOpen] = useState(false)
  const { image } = watch()

  const [createValet, { loading }] = useMutation(CreateValetDocument, {
    onCompleted() {
      toast('Valet created.🎉')
      reset()
      setOpen(false)
    },
  })

  const { uploading, upload } = useCloudinaryUpload()

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Valet</Button>
      <Dialog
        widthClassName="max-w-xl"
        open={open}
        setOpen={setOpen}
        title={'Create Valet'}
      >
        <Form
          onSubmit={handleSubmit(async ({ image, ...data }) => {
            const images = await upload(image)
            await createValet({
              variables: { createValetInput: { ...data, image: images[0] } },
            })
          })}
        >
          <HtmlLabel title="UID" error={errors.uid?.message}>
            <HtmlInput placeholder="uid of the valet" {...register('uid')} />
          </HtmlLabel>
          <HtmlLabel title="Display Name" error={errors.displayName?.message}>
            <HtmlInput
              placeholder="Name of the valet"
              {...register('displayName')}
            />
          </HtmlLabel>
          <HtmlLabel title="Licence ID" error={errors.licenceID?.message}>
            <HtmlInput
              placeholder="Licence ID of the valet"
              {...register('licenceID')}
            />
          </HtmlLabel>
          <ImagePreview srcs={image} clearImage={() => resetField('image')}>
            <Controller
              control={control}
              name={`image`}
              render={({ field }) => (
                <HtmlInput
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => field.onChange(e?.target?.files)}
                />
              )}
            />
          </ImagePreview>
          <Button loading={uploading || loading} type="submit">
            Create valet
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
