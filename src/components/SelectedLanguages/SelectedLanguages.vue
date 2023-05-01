<template>
		<Breadcrumb 
			v-if="selectedLanguages.length"
			:style="{ cursor: loaderStore.isLoading ? 'wait' : 'pointer' }"
			:model="selectedLanguages" 
			@click="openModal" 
		>
			<template #item="{item}">
				<span class="item">{{ item.label }}</span>
			</template>
		</Breadcrumb>
		<div 
			v-if="!selectedLanguages.length" 
			:style="{ cursor: loaderStore.isLoading ? 'wait' : 'pointer' }"
			class="p-breadcrumb breadcrumb-blank" 
			@click="openModal"
		>
			Select Languages...
		</div>
	<DynamicDialog />
</template>

<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import DynamicDialog from 'primevue/dynamicdialog';
import { useSelectedLanguages } from './hooks';

const { selectedLanguages, loaderStore, openModal } = useSelectedLanguages();
</script>

<style scoped>
.breadcrumb-blank {
	height: 53px;
	color: #495057;
}

.item {
	color: #495057;
}
</style>