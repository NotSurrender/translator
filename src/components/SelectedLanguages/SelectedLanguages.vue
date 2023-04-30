<template>
  <div>
		<div>
			<Breadcrumb 
				v-if="selectedLanguages.length"
				:style="{ cursor: translatorStore.isLoading ? 'wait' : 'pointer' }"
				:model="selectedLanguages" 
				@click="openModal" 
			>
				<template #item="{item}">
					<span class="item">{{ item }}</span>
				</template>
			</Breadcrumb>
			<div 
				v-if="!selectedLanguages.length" 
				class="p-breadcrumb breadcrumb-blank" 
				@click="openModal"
			>
				Select Languages...
			</div>
		</div>
		<DynamicDialog />
	</div>
</template>

<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import DynamicDialog from 'primevue/dynamicdialog';
import { useSelectedLanguages } from './hooks';

const { selectedLanguages, translatorStore, openModal } = useSelectedLanguages();
</script>

<style scoped>
.breadcrumb-blank {
	height: 60px;
	cursor: pointer;
	color: #495057;
}

.item {
	color: #495057;
}
</style>