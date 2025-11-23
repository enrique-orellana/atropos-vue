import { Atropos, type AtroposInstance, type AtroposOptions } from 'atropos'

export type AtroposConfiguration = Partial<Omit<AtroposOptions, 'el'>>

export const defaultConfiguration: AtroposConfiguration = {
	alwaysActive: false,
	rotate: true,
	shadow: true,
	highlight: true
}

export class AtroposClass extends HTMLElement {
	private atropos: AtroposInstance | null = null
	private configurationOptions: AtroposConfiguration = defaultConfiguration

	connectedCallback(): void {
		this.initializeInstance()
	}

	disconnectedCallback(): void {
		if (this.atropos) {
			this.atropos.destroy()
			this.atropos = null
		}
	}

	set configuration(options: AtroposConfiguration) {
		this.configurationOptions = { ...defaultConfiguration, ...options }
		if (this.atropos) {
			this.initializeInstance()
		}
	}

	get configuration(): AtroposConfiguration {
		return this.configurationOptions
	}

	private initializeInstance(): void {
		const atroposElement = this.querySelector('.atropos') as HTMLElement | null
		if (!atroposElement) return

		if (this.atropos) {
			this.atropos.destroy()
		}

		this.atropos = Atropos({
			el: atroposElement,
			...this.configurationOptions
		})
	}
}
