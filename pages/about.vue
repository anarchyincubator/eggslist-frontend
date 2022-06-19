<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <PageWrapper class="flex flex-col justify-center items-center">
    <PageHeader>
      <PageTitle text="Hello" class="capitalize" />
    </PageHeader>
    <PageBody>
      <div class="flex flex-col items-center">
        <img
          src="https://avatars.githubusercontent.com/u/41994283?v=4"
          class="inline-block rounded-full"
          alt="viandwi24"
          width="100"
          height="100"
        />
        <Button
          size="xs"
          type="opposite"
          text="Back"
          class="font-extrabold mt-4"
          to="/"
        />
      </div>
    </PageBody>
  </PageWrapper>
</template>
