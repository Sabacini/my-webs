// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadLeads();
    loadStats();
});

// Tab Switching
function switchTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active', 'border-primary-600', 'text-primary-600');
        button.classList.add('border-transparent', 'text-gray-500');
    });

    // Show selected tab
    document.getElementById(`${tab}Section`).classList.remove('hidden');

    // Add active class to selected button
    const activeButton = document.getElementById(`${tab}Tab`);
    activeButton.classList.add('active', 'border-primary-600', 'text-primary-600');
    activeButton.classList.remove('border-transparent', 'text-gray-500');

    // Load data for the selected tab
    if (tab === 'leads') {
        loadLeads();
    } else if (tab === 'testimonials') {
        loadTestimonials();
    } else if (tab === 'stats') {
        loadStats();
    }
}

// Leads Management
async function loadLeads() {
    try {
        const response = await fetch('/api/admin/leads');
        const leads = await response.json();

        const tbody = document.getElementById('leadsTableBody');
        tbody.innerHTML = '';

        if (leads.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">No leads yet</td></tr>';
            return;
        }

        leads.forEach(lead => {
            const date = new Date(lead.created_at).toLocaleString('ru-RU');
            const statusColors = {
                'new': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                'in_progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            };

            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50 dark:hover:bg-gray-700';
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm">#${lead.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${lead.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">${lead.contact}</td>
                <td class="px-6 py-4 text-sm max-w-xs truncate">${lead.message || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <select onchange="updateLeadStatus(${lead.id}, this.value)" class="text-xs px-2 py-1 rounded-full ${statusColors[lead.status]} border-0">
                        <option value="new" ${lead.status === 'new' ? 'selected' : ''}>New</option>
                        <option value="in_progress" ${lead.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                        <option value="completed" ${lead.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button onclick="deleteLead(${lead.id})" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading leads:', error);
    }
}

async function updateLeadStatus(id, status) {
    try {
        await fetch(`/api/admin/leads/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        loadLeads();
        loadStats();
    } catch (error) {
        console.error('Error updating lead status:', error);
    }
}

async function deleteLead(id) {
    if (!confirm('Are you sure you want to delete this lead?')) {
        return;
    }

    try {
        await fetch(`/api/admin/leads/${id}`, {
            method: 'DELETE'
        });
        loadLeads();
        loadStats();
    } catch (error) {
        console.error('Error deleting lead:', error);
    }
}

// Testimonials Management
async function loadTestimonials() {
    try {
        const response = await fetch('/api/admin/testimonials');
        const testimonials = await response.json();

        const grid = document.getElementById('testimonialsGrid');
        grid.innerHTML = '';

        if (testimonials.length === 0) {
            grid.innerHTML = '<p class="col-span-2 text-center text-gray-500">No testimonials yet</p>';
            return;
        }

        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'bg-gray-50 dark:bg-gray-700 rounded-lg p-6';
            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="font-bold">${testimonial.name_ru} / ${testimonial.name_en}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${testimonial.company_ru || '-'}</p>
                    </div>
                    <span class="text-yellow-500">${'⭐'.repeat(testimonial.rating)}</span>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">${testimonial.text_ru}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">${testimonial.text_en}</p>
                <div class="flex items-center justify-between">
                    <span class="text-xs px-2 py-1 rounded ${testimonial.visible ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300'}">
                        ${testimonial.visible ? 'Visible' : 'Hidden'}
                    </span>
                    <div class="space-x-2">
                        <button onclick='editTestimonial(${JSON.stringify(testimonial)})' class="text-blue-600 hover:text-blue-900 dark:text-blue-400 text-sm">
                            Edit
                        </button>
                        <button onclick="deleteTestimonial(${testimonial.id})" class="text-red-600 hover:text-red-900 dark:text-red-400 text-sm">
                            Delete
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

function showAddTestimonialModal() {
    document.getElementById('testimonialForm').reset();
    document.getElementById('testimonialId').value = '';
    document.getElementById('testimonialModal').classList.remove('hidden');
}

function closeTestimonialModal() {
    document.getElementById('testimonialModal').classList.add('hidden');
}

function editTestimonial(testimonial) {
    document.getElementById('testimonialId').value = testimonial.id;
    document.getElementById('name_ru').value = testimonial.name_ru;
    document.getElementById('name_en').value = testimonial.name_en;
    document.getElementById('company_ru').value = testimonial.company_ru || '';
    document.getElementById('company_en').value = testimonial.company_en || '';
    document.getElementById('text_ru').value = testimonial.text_ru;
    document.getElementById('text_en').value = testimonial.text_en;
    document.getElementById('rating').value = testimonial.rating;
    document.getElementById('visible').value = testimonial.visible;
    document.getElementById('testimonialModal').classList.remove('hidden');
}

document.getElementById('testimonialForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('testimonialId').value;
    const data = {
        name_ru: document.getElementById('name_ru').value,
        name_en: document.getElementById('name_en').value,
        company_ru: document.getElementById('company_ru').value,
        company_en: document.getElementById('company_en').value,
        text_ru: document.getElementById('text_ru').value,
        text_en: document.getElementById('text_en').value,
        rating: parseInt(document.getElementById('rating').value),
        visible: parseInt(document.getElementById('visible').value)
    };

    try {
        if (id) {
            // Update
            await fetch(`/api/admin/testimonials/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } else {
            // Create
            await fetch('/api/admin/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }

        closeTestimonialModal();
        loadTestimonials();
    } catch (error) {
        console.error('Error saving testimonial:', error);
        alert('Error saving testimonial');
    }
});

async function deleteTestimonial(id) {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
        return;
    }

    try {
        await fetch(`/api/admin/testimonials/${id}`, {
            method: 'DELETE'
        });
        loadTestimonials();
    } catch (error) {
        console.error('Error deleting testimonial:', error);
    }
}

// Statistics
async function loadStats() {
    try {
        const response = await fetch('/api/admin/stats');
        const stats = await response.json();

        document.getElementById('statTotal').textContent = stats.total || 0;
        document.getElementById('statNew').textContent = stats.new_leads || 0;
        document.getElementById('statProgress').textContent = stats.in_progress || 0;
        document.getElementById('statCompleted').textContent = stats.completed || 0;
        document.getElementById('statToday').textContent = stats.today || 0;
        document.getElementById('statWeek').textContent = stats.this_week || 0;
        document.getElementById('statMonth').textContent = stats.this_month || 0;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}
