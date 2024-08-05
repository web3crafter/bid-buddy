import { CreateItemAction } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function CreateBidPage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <form
        action={CreateItemAction}
        className=" flex flex-col border p-8 rounded-xl gap-4 max-w-md"
      >
        <Input required className="" name="name" placeholder="Name your item" />
        <Input
          required
          type="number"
          step="0.01"
          name="startingPrice"
          placeholder="What to start your action at"
          className=""
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  )
}
