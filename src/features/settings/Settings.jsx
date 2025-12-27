import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getSettings, updateSettings } from '../../services/api';
import { Upload, Save } from 'lucide-react';
import Card from '../../components/ui/Card';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [homeBanner, setHomeBanner] = useState(null);
  const [logo, setLogo] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      reset({
        aboutUs: data.aboutUs,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        supportEmail: data.supportEmail,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      });
      setHomeBanner(data.homeBanner);
      setLogo(data.logo);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      const settingsData = {
        ...data,
        homeBanner: homeBanner,
        logo: logo,
      };
      await updateSettings(settingsData);
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHomeBanner(URL.createObjectURL(file));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Website Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Home Banner */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Home Banner</h2>
          <div className="space-y-4">
            {homeBanner && (
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img src={homeBanner} alt="Home Banner" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="cursor-pointer inline-flex items-center gap-2 btn-secondary">
              <Upload size={18} />
              {homeBanner ? 'Change Banner' : 'Upload Banner'}
              <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
            </label>
          </div>
        </Card>

        {/* Logo */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Logo</h2>
          <div className="space-y-4">
            {logo && (
              <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            )}
            <label className="cursor-pointer inline-flex items-center gap-2 btn-secondary">
              <Upload size={18} />
              {logo ? 'Change Logo' : 'Upload Logo'}
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
          </div>
        </Card>

        {/* About Us */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Us</h2>
          <textarea
            {...register('aboutUs', { required: 'About us text is required' })}
            className="input-field"
            rows="6"
            placeholder="Enter about us text..."
          />
          {errors.aboutUs && (
            <p className="text-red-500 text-sm mt-1">{errors.aboutUs.message}</p>
          )}
        </Card>

        {/* Contact Details */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Contact Phone</label>
              <input
                type="text"
                {...register('contactPhone', { required: 'Contact phone is required' })}
                className="input-field"
                placeholder="+1234567890"
              />
              {errors.contactPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>
              )}
            </div>
            <div>
              <label className="label">Contact Email</label>
              <input
                type="email"
                {...register('contactEmail', { required: 'Contact email is required' })}
                className="input-field"
                placeholder="contact@example.com"
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
              )}
            </div>
            <div>
              <label className="label">Support Email</label>
              <input
                type="email"
                {...register('supportEmail', { required: 'Support email is required' })}
                className="input-field"
                placeholder="support@example.com"
              />
              {errors.supportEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.supportEmail.message}</p>
              )}
            </div>
          </div>
        </Card>

        {/* SEO Settings */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="label">SEO Title</label>
              <input
                type="text"
                {...register('seoTitle')}
                className="input-field"
                placeholder="Enter SEO title"
              />
            </div>
            <div>
              <label className="label">SEO Description</label>
              <textarea
                {...register('seoDescription')}
                className="input-field"
                rows="3"
                placeholder="Enter SEO description"
              />
            </div>
          </div>
        </Card>

        {/* Change Password */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Current Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="label">New Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Confirm new password"
              />
            </div>
            <button type="button" className="btn-secondary">
              Update Password
            </button>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" className="btn-primary flex items-center gap-2" disabled={saving}>
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;


