<!-- @format -->

<template>
  <section class="done d-flex-column__center">
    <img
      :src="require('@/assets/img/icons/register-done.svg')"
      alt="register-done"
      class="success-full"
    />
    <p class="heading-2">ثبت نام با موفقیت انجام شد</p>
    <base-button type="submit" to="/" kind="link" mode="btn btn-big"
      >ورود به سایت</base-button
    >
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/sass/components/forms/_form.scss';
@import '@/assets/sass/components/forms/register/_done.scss';
</style>
