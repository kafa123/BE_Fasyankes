export interface CreateScenarioWithAnswerDto {
    simulation_id: number;
    scenario: string;
    question: string;
    component: 'Pendaftaran' | 'Data Kunjungan' | 'Data Rujukan' | 'Data SEP';
    answer_text?: string;
    answer_image?: string;
  }